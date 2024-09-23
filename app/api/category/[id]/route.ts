// app/api/category/[id]/route.ts (for deleting a category in Next.js App Router)
import { NextResponse } from 'next/server';
import {
  deleteCategoryById,
  updateCategoryById,
} from '@/app/actions-and-queries/category/category-actions';
import { Types } from 'mongoose';
import { getCategoryById } from '@/app/actions-and-queries/category/category-queries';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const categoryId = new Types.ObjectId(params.id);
    const category = await getCategoryById(categoryId);
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching category' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const categoryId = new Types.ObjectId(params.id);
    const updateData = await request.json();
    const updatedCategory = await updateCategoryById(categoryId, updateData);
    return NextResponse.json(updatedCategory);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating category' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const categoryId = new Types.ObjectId(params.id);
    const deletedCategory = await deleteCategoryById(categoryId);
    return NextResponse.json(deletedCategory);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting category' },
      { status: 500 }
    );
  }
}
