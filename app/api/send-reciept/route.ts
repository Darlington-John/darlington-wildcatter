import { NextRequest, NextResponse } from "next/server";
import { mailOptions, transporter } from "~/lib/nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { email, name, phone, address, city, state, totalPrice, products } =
      await req.json();

    if (
      !email ||
      !name ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !totalPrice ||
      !products
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const mappedItems = products
      .map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data: any, index: number) => `
          <tr style="background-color: #cc8a00; border-bottom: 1px solidrgb(0, 0, 0);" key="${index}">
            <td style="font-size: 12px; padding: 5px; word-break: break-word; max-width: 180px;text-transform: capitalize;">
              ${data.name} ${data.sizes ? ` - size (${data.size})` : ""}
            </td>
            <td style="font-size: 12px; padding: 5px; text-align: center;">
              ${data.quantity}
            </td>
            <td style="font-size: 12px; padding: 5px; text-align: center;">
              ₦ ${
                data?.price && data.quantity !== undefined
                  ? (data.price * data.quantity).toLocaleString("en-US")
                  : "N/A"
              }
            </td>
          </tr>`
      )
      .join("");
    await transporter.sendMail({
      ...mailOptions,
      to: email,
      subject: "Order Reciept",
      html: `<table width="400" border="0" cellspacing="0" cellpadding="0" style="background-color: #cc8a00; padding: 20px;">
    <tr>
       <td align="left">
          <h1 style="color: #000; font-size: 16px; font-weight: bold; text-transform: uppercase; margin: 0;">Order Receipt</h1>
       </td>
       <td align="right">
          <img src="https://res.cloudinary.com/dycw73vuy/image/upload/v1744406900/logo_qtpt4q.png" width="120" />
          <p style="font-size: 12px; color: #000; margin: 2px 0;">contact@wildcatter.com</p>
          <p style="font-size: 12px; color: #000; margin: 2px 0;">darlington-wildcatter.vercel.app</p>
       </td>
    </tr>
  </table>
  
  <table width="400" border="0" cellspacing="0" cellpadding="0" style="background-color: #cc8a00; padding: 20px;">
    <tr>
       <td colspan="2">
          
          <p style="font-size: 14px; font-weight: bold;">Dear ${name},</p>
          <p style="font-size: 12px; color: #000;">
            We are writing to inform you that the order placed on ${new Date().toLocaleString(
              "en-US",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              }
            )} has been confirmed.
          </p>
       </td>
    </tr>
  </table>
  
  <table width="400" border="0" cellspacing="0" cellpadding="10" style="background-color: #cc8a00; border-collapse: collapse; border-top: 2px solid #000; border-bottom: 2px solid #000; padding-top: 10px;">
    <tr>
       <td width="50%" valign="top">
          <h3 style="color: #000; font-size: 14px; margin-bottom: 5px;">SHIPPING ADDRESS</h3>
          <p style="font-size: 12px; color: #000; margin: 2px 0;">${city}, ${state}</p>
          <p style="font-size: 12px; color: #000; margin: 2px 0;">${phone}</p>
       </td>
       <td width="50%" valign="top">
   
          <p style="font-size: 12px; color: #000; margin: 2px 0;">${email}</p>
          <p style="font-size: 12px; color: #000; margin: 2px 0;">${name}</p>
       </td>
    </tr>
  </table>
  
  <table width="400" border="0" cellspacing="0" cellpadding="5" style="border-collapse: collapse; padding-top: 10px; background-color: #cc8a00;">
    <tr>
       <td colspan="3">
          <h3 style="color: #000; font-size: 14px; margin-bottom: 5px;">SUMMARY</h3>
       </td>
    </tr>
    <tr style="background-color: #000; color: white; text-align: center;">
       <th width="60%" style="font-size: 12px; padding: 5px;text-align: center;">Product</th>
       <th width="20%" style="font-size: 12px; padding: 5px;">Quantity</th>
       <th width="20%" style="font-size: 12px; padding: 5px;">Price</th>
    </tr>
    ${mappedItems}
  </table>
  
  <table width="400" border="0" cellspacing="0" cellpadding="5" style="padding-top: 10px;background-color: #cc8a00;">
    <tr>
       <td align="right" style="font-size: 13px;">
          <p><strong>Total Paid:</strong> ₦${totalPrice.toLocaleString(
            "en-US"
          )}</p>
       </td>
    </tr>
  
  </table>
  <table width="400" border="0" cellspacing="0" cellpadding="5" style="padding-top: 10px; background-color: #cc8a00;">
    <tr>
       <td align="center" style="font-size: 13px;">
        <p style="text-align: center; font-size: 12px; color: #000;" width="400" >©Wildcatter, 2025</p>
       </td>
    </tr>
  
  </table>`,
    });
    return NextResponse.json({
      message: "Order created successfully and reciept sent",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred during reciept creation" + error },
      { status: 500 }
    );
  }
}
