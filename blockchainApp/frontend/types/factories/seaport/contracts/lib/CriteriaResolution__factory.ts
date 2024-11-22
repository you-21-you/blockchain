/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../../../common";
import type {
  CriteriaResolution,
  CriteriaResolutionInterface,
} from "../../../../seaport/contracts/lib/CriteriaResolution";

const _abi = [
  {
    inputs: [],
    name: "ConsiderationCriteriaResolverOutOfRange",
    type: "error",
  },
  {
    inputs: [],
    name: "CriteriaNotEnabledForItem",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidProof",
    type: "error",
  },
  {
    inputs: [],
    name: "OfferCriteriaResolverOutOfRange",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "enum Side",
        name: "side",
        type: "uint8",
      },
    ],
    name: "OrderCriteriaResolverOutOfRange",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "orderIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "considerationIndex",
        type: "uint256",
      },
    ],
    name: "UnresolvedConsiderationCriteria",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "orderIndex",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "offerIndex",
        type: "uint256",
      },
    ],
    name: "UnresolvedOfferCriteria",
    type: "error",
  },
] as const;

const _bytecode =
  "0x60808060405234601357603a908160198239f35b600080fdfe600080fdfea26469706673582212209c631cdb387bf7b9f032c14a2be7d346b8bdda3c54ae2d874aa0705c0141001d64736f6c63430008110033";

type CriteriaResolutionConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CriteriaResolutionConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CriteriaResolution__factory extends ContractFactory {
  constructor(...args: CriteriaResolutionConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      CriteriaResolution & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): CriteriaResolution__factory {
    return super.connect(runner) as CriteriaResolution__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CriteriaResolutionInterface {
    return new Interface(_abi) as CriteriaResolutionInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): CriteriaResolution {
    return new Contract(address, _abi, runner) as unknown as CriteriaResolution;
  }
}
