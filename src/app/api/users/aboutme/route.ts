import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from '@/helpers/getDataFromToken';

connect();

export async function POST(req: NextRequest) {
  // extract data from token
  try {
    const userId = await getDataFromToken(req);

    const user = await User.findOne({ _id: userId }).select('-password');

    // check if there is no user
    if (!user) {
      return NextResponse.json(
        {
          error: 'User does not exist',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: 'User found',
        user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 400 }
    );
  }
}
