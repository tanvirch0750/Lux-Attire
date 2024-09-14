import { User } from '@/db/models/user-model';
import { dbConnect } from '@/db/service/mongo';
import bcryptjs from 'bcryptjs';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { name, email, password, phone } = await request.json();

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      name,
      email,
      phone,
      role: 'user',
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      savedUser,
      status: 201,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
