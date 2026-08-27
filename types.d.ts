declare global {
  interface D1Database {
    prepare(query: string): D1PreparedStatement;
  }
  interface D1PreparedStatement {
    bind(...values: unknown[]): D1PreparedStatement;
    first<T = unknown>(): Promise<T | null>;
    run(): Promise<unknown>;
  }
}
export {};
