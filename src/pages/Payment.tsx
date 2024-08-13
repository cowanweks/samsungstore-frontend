import { useEffect } from "react"



export function PaymentFailure() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-red-500 to-pink-500">
			<div className="bg-white rounded-lg p-10 text-center shadow-lg max-w-md w-full">
				<div className="text-6xl text-red-500 mb-4">
					<i className="fas fa-times-circle"></i>
				</div>
				<h1 className="text-2xl font-bold mb-2 text-gray-800">Payment Failed</h1>
				<p className="text-gray-600 mb-6">Unfortunately, your payment could not be processed. Please try again.</p>
				<button
					className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition duration-300 mb-2"
					onClick={() => window.location.href = '/retry'}
				>
					Retry Payment
				</button>
				<button
					className="bg-gray-500 text-white py-2 px-6 rounded hover:bg-gray-600 transition duration-300"
					onClick={() => window.location.href = '/'}
				>
					Go to Home
				</button>
			</div>
		</div>
	);
}


export function PaymentSuccess() {


	useEffect(() => {

		const finishPayment = async () => {

			const response = await fetch(``);

			if (!response.ok) {

			}


		}

		finishPayment();
	})



	return <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-500">
		<div className="bg-white rounded-lg p-10 text-center shadow-lg max-w-md w-full">
			<div className="text-6xl text-green-500 mb-4">
				<i className="fas fa-check-circle"></i>
			</div>
			<h1 className="text-2xl font-bold mb-2 text-gray-800">Payment Successful!</h1>
			<p className="text-gray-600 mb-6">Thank you for your purchase. Your payment has been processed successfully.</p>
			<button
				className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-300"
				onClick={() => window.location.href = '/'}
			>
				Continue Shopping
			</button>
		</div>
	</div>
}