import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, phone, address, productName, quantity, totalPrice } = body

    // Data yang akan dihantar ke ToyyibPay
    const secretKey = process.env.NEXT_PUBLIC_TOYYIBPAY_SECRET_KEY
    const categoryCode = process.env.NEXT_PUBLIC_TOYYIBPAY_CATEGORY_CODE

    const billData = {
      userSecretKey: secretKey,
      categoryCode: categoryCode,
      billName: `Pembayaran ${productName} (${quantity} balang)`,
      billDescription: `Tempahan oleh ${name} ke alamat: ${address}`,
      billPriceSetting: 1, // Harga tetap
      billPayorInfo: 1, // Wajibkan info pembeli
      billAmount: Math.round(totalPrice * 100), // ToyyibPay terima dalam sen (contoh: RM10.00 = 1000)
      billReturnUrl: 'http://localhost:3000/payment-success',
      billCallbackUrl: '',
      billExternalReferenceNo: 'ORD-' + Date.now(),
      billPhone: phone,
      billEmail: 'customer@sambalkaeyke.com',
    }

    // Hantar permintaan kepada API ToyyibPay (Gunakan sandbox/dev dulu atau terus ke Production)
    // Nota: Untuk ToyyibPay live, endpoint adalah https://toyyibpay.com/index.php/api/createBill
    const response = await fetch('https://toyyibpay.com/index.php/api/createBill', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(billData),
    })

    const data = await response.json()

    if (data && data[0]?.BillCode) {
      // Pulangkan URL bil ToyyibPay kepada pelayar web
      const billCode = data[0].BillCode
      const paymentUrl = `https://toyyibpay.com/${billCode}`
      return NextResponse.json({ success: true, paymentUrl })
    } else {
      return NextResponse.json({ success: false, error: 'Gagaljana bil dari ToyyibPay' }, { status: 400 })
    }

  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}