declare module 'passport-jwt' {
  import { Request } from 'express';

  export interface StrategyOptions {
    jwtFromRequest: (req: Request) => string | null;
    secretOrKey: string;
    issuer?: string;
    audience?: string;
    algorithms?: string[];
  }

  export interface VerifiedCallback {
    (error: Error | null, user?: unknown): void;
  }

  export class Strategy {
    constructor(
      options: StrategyOptions,
      verify: (payload: unknown, done: VerifiedCallback) => void,
    );
    name: string;
  }

  export namespace ExtractJwt {
    function fromAuthHeaderAsBearerToken(): (req: Request) => string | null;
  }
}
