// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {FHE, euint32, externalEuint32} from "@fhevm/solidity/lib/FHE.sol";
import {SepoliaConfig} from "@fhevm/solidity/config/ZamaConfig.sol";

/// @title Ghost Cipher Trade - Encrypted net exposure per trader
/// @author ghost-cipher-trade
/// @notice Stores a per-trader encrypted net exposure value that can only be
///         processed on-chain in encrypted form and decrypted off-chain by the owner.
contract GhostCipherTrade is SepoliaConfig {
    /// @dev Events for debugging and monitoring
    event Increment(address indexed user, euint32 delta);
    event Decrement(address indexed user, euint32 delta);
    
    /// @dev Encrypted net exposure per trader (e.g. total long minus total short size).
    mapping(address => euint32) private _netExposure;

    /// @notice Returns the encrypted net exposure for the caller.
    /// @return The caller's encrypted net exposure handle.
    function getCount() external returns (euint32) {
        return _netExposure[msg.sender];
    }

    /// @notice Increases the caller's encrypted net exposure by an encrypted amount.
    /// @param inputEuint32 Encrypted delta encoded as externalEuint32.
    /// @param inputProof Input proof produced by the FHEVM SDK.
    /// @dev The cleartext amount is never revealed on-chain. All arithmetic
    ///      happens in encrypted space using FHE precompiles.
    function increment(externalEuint32 inputEuint32, bytes calldata inputProof) external {
        require(msg.sender != address(0), "Zero address not allowed");
        euint32 delta = FHE.fromExternal(inputEuint32, inputProof);
        
        // Debug: Log increment operation (development only)
        emit Increment(msg.sender, delta);

        euint32 current = _netExposure[msg.sender];
        euint32 updated = FHE.add(current, delta);

        _netExposure[msg.sender] = updated;

        FHE.allowThis(updated);
        FHE.allow(updated, msg.sender);
    }

    /// @notice Decreases the caller's encrypted net exposure by an encrypted amount.
    /// @param inputEuint32 Encrypted delta encoded as externalEuint32.
    /// @param inputProof Input proof produced by the FHEVM SDK.
    /// @dev For an MVP we do not enforce cleartext underflow checks on-chain.
    function decrement(externalEuint32 inputEuint32, bytes calldata inputProof) external {
        require(msg.sender != address(0), "Zero address not allowed");
        euint32 delta = FHE.fromExternal(inputEuint32, inputProof);
        
        // Debug: Log decrement operation (development only)
        emit Decrement(msg.sender, delta);

        euint32 current = _netExposure[msg.sender];
        euint32 updated = FHE.sub(current, delta);

        _netExposure[msg.sender] = updated;

        FHE.allowThis(updated);
        FHE.allow(updated, msg.sender);
    }

    /// @notice Returns the FHEVM protocol ID from the configuration.
    /// @return The protocol identifier for this FHEVM deployment.
    function protocolId() external view returns (uint256) {
        return PROTOCOL_ID;
    }
}
