import {
  Settings,
  ISettings,
  IShippingMethod,
} from '@/db/models/settings-model';
import { dbConnect } from '@/db/service/mongo';
import { Types } from 'mongoose';
import { revalidatePath } from 'next/cache';

interface MongoError extends Error {
  code?: number;
}

export const createOrUpdateShipping = async (
  shippingData: IShippingMethod[]
) => {
  await dbConnect();
  try {
    // Check if any existing settings exist
    const existingSettings = await Settings.find({});

    if (existingSettings.length === 0) {
      // No existing settings, create new settings with shipping data
      const newSettings = new Settings({ shippingPrice: shippingData });
      await newSettings.save();
      revalidatePath('/dashboard/settings', 'page');
      return JSON.parse(JSON.stringify(newSettings));
    } else {
      // Update existing settings
      const settingsId = existingSettings[0]._id;

      // Update the shipping field with the new data
      const updatedSettings = await Settings.findByIdAndUpdate(
        settingsId,
        { $set: { shippingPrice: shippingData } },
        { new: true, runValidators: true }
      );

      if (!updatedSettings) {
        throw new Error('Error updating shipping settings');
      }

      revalidatePath('/dashboard/settings', 'page');
      return JSON.parse(JSON.stringify(updatedSettings));
    }
  } catch (error) {
    const typedError = error as MongoError;
    // Check for duplicate key error (E11000) in both create and update contexts
    if (typedError.code === 11000) {
      throw new Error('Shipping settings already exist'); // Custom error message
    }
    throw new Error('Error creating or updating shipping settings');
  }
};

// Create or update settings
export const createOrUpdateSettings = async (settingsData: ISettings) => {
  await dbConnect();
  try {
    // Check if any existing settings exist
    const existingSettings = await Settings.find({});

    if (existingSettings.length === 0) {
      // No existing settings, create new
      const newSettings = new Settings(settingsData);
      await newSettings.save();
      revalidatePath('/dashboard/settings', 'page');
      return JSON.parse(JSON.stringify(newSettings));
    } else {
      // Update existing settings
      const settingsId = existingSettings[0]._id;

      // Update the settings with the new data
      const updatedSettings = await Settings.findByIdAndUpdate(
        settingsId,
        { $set: settingsData }, // Use $set to update the specific fields
        { new: true, runValidators: true }
      );

      if (!updatedSettings) {
        throw new Error('Error updating settings');
      }

      revalidatePath('/dashboard/settings', 'page');
      return JSON.parse(JSON.stringify(updatedSettings));
    }
  } catch (error) {
    const typedError = error as MongoError;
    // Check for duplicate key error (E11000) in both create and update contexts
    if (typedError.code === 11000) {
      throw new Error('Settings already exist'); // Custom error message
    }
    throw new Error('Error creating or updating settings');
  }
};

// Update a setting by ID
export const updateSettingsById = async (
  settingsId: Types.ObjectId | string,
  updateData: Partial<ISettings>
) => {
  await dbConnect();
  try {
    const updatedSettings = await Settings.findByIdAndUpdate(
      settingsId,
      updateData,
      { new: true, runValidators: true }
    );
    if (!updatedSettings) {
      throw new Error('Settings not found');
    }

    revalidatePath('/dashboard/settings', 'page');
    return JSON.parse(JSON.stringify(updatedSettings));
  } catch (error) {
    const typedError = error as MongoError;
    // Check if the error is a duplicate key error (E11000)
    if (typedError.code === 11000) {
      throw new Error('Settings already exist');
    }
    throw new Error('Error updating settings');
  }
};

// Soft delete a setting by updating isDeleted to true
export const deleteSettingsById = async (
  settingsId: Types.ObjectId | string
) => {
  await dbConnect();
  try {
    const deletedSettings = await Settings.findOneAndUpdate(
      { _id: settingsId, 'shippingPrice.isDeleted': false },
      { 'shippingPrice.isDeleted': true },
      { new: true }
    );

    if (!deletedSettings) {
      throw new Error('Settings not found or is already deleted');
    }

    revalidatePath('/dashboard/settings', 'page');

    return JSON.parse(JSON.stringify(deletedSettings));
  } catch (error) {
    throw new Error('Error deleting settings');
  }
};

// Undo delete functionality by setting isDeleted to false
export const undoDeleteSettings = async (
  settingsId: Types.ObjectId | string
) => {
  await dbConnect();
  try {
    const restoredSettings = await Settings.findOneAndUpdate(
      { _id: settingsId, 'shippingPrice.isDeleted': true },
      { 'shippingPrice.isDeleted': false },
      { new: true }
    );

    if (!restoredSettings) {
      throw new Error('Settings not found or is not deleted');
    }

    revalidatePath('/dashboard/settings', 'page');

    return JSON.parse(JSON.stringify(restoredSettings));
  } catch (error) {
    throw new Error('Error undoing settings deletion');
  }
};
