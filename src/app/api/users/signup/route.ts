import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sendMail } from '@/helpers/mailer';

connect();

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    // VALIDATION Karni he abhi

    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // send Verification Email
    await sendMail({ email, emailType: 'VERIFY', userId: savedUser._id });

    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      savedUser,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message,
      },
      { status: 500 }
    );
  }
}
