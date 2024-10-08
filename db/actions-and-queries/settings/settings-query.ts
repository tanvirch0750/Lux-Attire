import { Settings } from '@/db/models/settings-model';
import { dbConnect } from '@/db/service/mongo';
import { Types } from 'mongoose';

// Get all settings
export const getAllSettings = async () => {
  await dbConnect();
  try {
    const settings = await Settings.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(settings));
  } catch (error) {
    throw new Error('Error fetching settings: ' + (error as Error).message);
  }
};

// Get a setting by ID
export const getSettingsById = async (settingsId: Types.ObjectId) => {
  await dbConnect();
  try {
    const settings = await Settings.findById(settingsId);
    if (!settings) {
      throw new Error('Settings not found');
    }
    return JSON.parse(JSON.stringify(settings));
  } catch (error) {
    throw new Error('Error fetching settings');
  }
};

export const getShippingSettings = async () => {
  await dbConnect();
  try {
    // Fetch only non-deleted shipping methods
    const shippingSettings = await Settings.findOne(
      { 'shippingPrice.isDeleted': false }, // Filter for non-deleted shipping methods
      { shippingPrice: 1 } // Project only the shippingPrice array
    );

    // Check if shipping settings are found
    if (!shippingSettings || shippingSettings.shippingPrice.length === 0) {
      return null;
    }

    // Filter the non-deleted shipping methods from the array
    const activeShippingMethods = shippingSettings.shippingPrice.filter(
      (method: { isDeleted: any }) => !method.isDeleted
    );

    // Return the active shipping methods
    return JSON.parse(JSON.stringify(activeShippingMethods));
  } catch (error) {
    // @ts-ignore
    throw new Error('Error fetching shipping settings: ' + error.message);
  }
};
