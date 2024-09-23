// app/api/category/route.ts (for Next.js App Router)
import { NextResponse } from 'next/server';
import { createCategory } from '@/app/actions-and-queries/category/category-actions';
import { getAllCategories } from '@/app/actions-and-queries/category/category-queries';

export async function GET() {
  try {
    const categories = await getAllCategories();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const categoryData = await request.json();
    const newCategory = await createCategory(categoryData);
    return NextResponse.json(newCategory);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating category' },
      { status: 500 }
    );
  }
}
