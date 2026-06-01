import { preferencesService } from "../services/preferencesService";
import { policyService } from "../services/policyService";

function inQuietHours(date: Date, start?: number, end?: number) {
  if (start === undefined || end === undefined) return false;
  const h = date.getUTCHours();
  return start < end ? (h >= start && h < end) : (h >= start || h < end);
}

export async function evaluate(input: any) {

  if (await policyService.isBlocked(input.region, input.notificationType, input.channel)) {
    return { decision: "deny", reason: "global_policy" };
  }

  const prefs = await preferencesService.get(input.userId);

  const match = prefs.find((p: any) =>
    p.type === input.notificationType &&
    p.channel === input.channel
  );

  if (match && match.enabled === false) {
    return { decision: "deny", reason: "user_pref" };
  }

  const quiet = await preferencesService.getQuietHours(input.userId);

  if (quiet && inQuietHours(new Date(input.datetime), quiet.startHour, quiet.endHour)) {
    if (input.notificationType.startsWith("marketing")) {
      return { decision: "deny", reason: "quiet_hours" };
    }
  }

  return { decision: "allow", reason: "ok" };
}
