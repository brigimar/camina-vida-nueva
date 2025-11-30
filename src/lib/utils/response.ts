export function success(data) {
  return { success: true, data };
}

export function error(message, status = 500) {
  return { success: false, error: message, status };
}
