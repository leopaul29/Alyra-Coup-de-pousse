async function mineBlocks(numBlocks) {
	const url = "http://127.0.0.1:8545"; // Replace with your Anvil node RPC URL
	const headers = { "Content-Type": "application/json" };

	for (let i = 0; i < numBlocks; i++) {
		const response = await fetch(url, {
			method: "POST",
			headers: headers,
			body: JSON.stringify({
				jsonrpc: "2.0",
				method: "evm_mine",
				id: Date.now(),
			}),
		});

		const data = await response.json();
		console.log(`Block mined: ${data.result}`);
	}
}
mineBlocks(5)
	.then(() => console.log("Blocks mined successfully"))
	.catch((error) => console.error("Error mining blocks:", error));
