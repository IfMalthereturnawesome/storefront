// pages/api/homerunnerPingback.js
import { NextRequest, NextResponse } from "next/server"


export default async (req, res) => {
  if (req.method === 'POST') {
    // Process the incoming data from Homerunner
    const data = req.body;

    // TODO: Perform necessary actions like updating your database, etc.


    // Send success response
    res.status(200).json({ message: 'Successfully received data' });
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
