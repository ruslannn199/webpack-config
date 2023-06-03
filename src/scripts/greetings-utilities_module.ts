function getLength(msg: string): number {
  return msg.length;
}

export function returnGreeting(greeting: string): void {
  const greetingLength = getLength(greeting);
  console.log(`The message from GreetingsLength_module is ${greeting}. It is ${greetingLength} characters long.`);
}