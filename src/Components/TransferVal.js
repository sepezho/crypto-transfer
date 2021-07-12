import React from "react";
import { Button, Input, message } from "antd";
import Web3 from "web3";

const TransferVal = (props) => {
	const sentSubmit = async () => {
		try {
			await window.ethereum.enable();
			const web3 = new Web3(window.ethereum);
			const gasPrice = await web3.eth.getGasPrice();
			props.setTransactionData({
				val: props.transactionData.val,
				gwei: web3.utils.fromWei(gasPrice, "ether"),
				showAlert: true,
			});
		} catch (e) {
			console.log("e: ", e);
			message.error("Something went wrong :(");
		}
	};

	return (
		<div>
			<p>
				Transfer value (ETH):
				<br />
				<Input
					placeholder="0,1"
					onChange={(e) =>
						props.setTransactionData({
							val: e.target.value,
							gwei: props.transactionData.gwei,
							showAlert: false,
						})
					}
				/>
			</p>
			<p>
				<Button type="dashed" onClick={sentSubmit}>
					Send
				</Button>
			</p>
		</div>
	);
};

export default TransferVal;
