'use server';

import {
  createOrUpdateShipping,
  deleteSettingsById,
  undoDeleteSettings,
  updateSettingsById,
} from '@/db/actions-and-queries/settings/settings-action';
import { ISettings, IShippingMethod } from '@/db/models/settings-model';
import { Types } from 'mongoose';

export async function createOrUpdateShippingAction(data: IShippingMethod[]) {
  try {
    const settings = await createOrUpdateShipping(data);
    return {
      data: settings,
      status: 200,
    };
  } catch (e: any) {
    console.log('inside server actions', e?.message);
    return {
      error: e?.message,
      status: 404,
    };
  }
}

export async function updateSettingsAction(
  settingsId: Types.ObjectId | string,
  data: ISettings
) {
  try {
    const settings = await updateSettingsById(settingsId, data);
    return {
      data: settings,
      status: 200,
    };
  } catch (e: any) {
    return {
      error: e?.message,
      status: 404,
    };
  }
}

export async function deleteSettingsAction(
  settingsId: Types.ObjectId | string
) {
  try {
    const settings = await deleteSettingsById(settingsId);
    return {
      data: settings,
      status: 200,
    };
  } catch (e: any) {
    return {
      error: e?.message,
      status: 404,
    };
  }
}

export async function undoDeleteSettingsAction(
  settingsId: Types.ObjectId | string
) {
  try {
    const settings = await undoDeleteSettings(settingsId);
    return {
      data: settings,
      status: 200,
    };
  } catch (e: any) {
    return {
      error: e?.message,
      status: 404,
    };
  }
}
