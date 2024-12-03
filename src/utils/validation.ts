export function isValidInput(input: string): boolean {
  return input.trim().length > 0;
}

export function generateMessageId(currentLength: number): number {
  return currentLength + 1;
}