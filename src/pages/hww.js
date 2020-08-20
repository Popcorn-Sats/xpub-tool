import React from "react"
import { Row, Col, Container } from "react-bootstrap"
import {
  MAINNET,
  // TESTNET,
} from "unchained-bitcoin"
import { LEDGER } from "unchained-wallets"

import Layout from "../components/layout"
import HardwareWalletExtendedPublicKeyImporter from "../components/hwXPubImporter.js"

const network = MAINNET // or TESTNET

function bip32Permutations(
  depth = 2,
  bipPrefixes = [44, 49, 84],
  isHardened = true
) {
  let permutations = []
  for (const bip of bipPrefixes) {
    let path = isHardened ? harden(bip) : bip
    for (let i = 0; i < depth; i++) {
      path += "/" + (isHardened ? harden(0) : 0)
      permutations.push(path)
    }
  }
  return permutations
}

function harden(string) {
  return string + "'"
}

const HWW = () => (
  <Layout pageInfo={{ pageName: "hww" }}>
    <Container className="text-center">
      <Row>
        <Col>
          {bip32Permutations(3, [49]).map(path => (
            <HardwareWalletExtendedPublicKeyImporter
              key={path}
              network={network}
              bip32Path={path}
              keystore={LEDGER}
            />
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          {bip32Permutations(3, [49], false).map(path => (
            <HardwareWalletExtendedPublicKeyImporter
              key={path}
              network={network}
              bip32Path={path}
              keystore={LEDGER}
            />
          ))}
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default HWW
