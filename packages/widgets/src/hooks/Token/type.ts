export interface TokenInfo {
  readonly chainId: number;
  readonly address: string;
  readonly name: string;
  readonly decimals: number;
  readonly symbol: string;
  readonly logoURI?: string;
  readonly tags?: string[];
  readonly extensions?: any;
}
export type TokenList = TokenInfo[];

export enum ApprovalState {
  Loading = 'Loading',
  Insufficient = 'ApprovalInsufficient',
  Approving = 'Approving',
  Sufficient = 'Sufficient',
  Unchecked = 'Unchecked',
}