/**
 * @param {Array<{user: number, duration: number, equipment: Array<string>}>} sessions
 * @param {{user?: number, minDuration?: number, equipment?: Array<string>, merge?: boolean}} [options]
 * @return {Array}
 */
export default function selectData(sessions, options={}) {
  
let result = sessions.map((session) => ({
    user: session.user,
    duration: session.duration,
    equipment: [...session.equipment],
  }));

  // 1) Merge first if required
  if (options.merge) {
    const merged = new Map();

    for (const session of result) {
      if (!merged.has(session.user)) {
        merged.set(session.user, {
          user: session.user,
          duration: session.duration,
          equipment: [...session.equipment],
        });
      } else {
        const prev = merged.get(session.user);

        // delete + set again so merged row takes latest occurrence position
        merged.delete(session.user);
        merged.set(session.user, {
          user: session.user,
          duration: prev.duration + session.duration,
          equipment: [...new Set([...prev.equipment, ...session.equipment])].sort(),
        });
      }
    }

    result = Array.from(merged.values());
  }

  // 2) Apply filters on merged data (or original if merge not requested)
  if (options.user !== undefined) {
    result = result.filter((session) => session.user === options.user);
  }

  if (options.minDuration !== undefined) {
    result = result.filter((session) => session.duration >= options.minDuration);
  }

  if (options.equipment !== undefined) {
    result = result.filter((session) =>
      options.equipment.some((item) => session.equipment.includes(item))
    );
  }

  return result;

}