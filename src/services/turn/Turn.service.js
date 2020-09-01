import { findTurns, findTurnsFail, findTurnsSuccess } from './Turn.actions';
import { turnApi } from '../../setup/feathersClient';
import { showMessage } from 'react-native-flash-message';

export default class TurnService {
  static async findNearTurns(region) {
    store.dispatch(findTurns());
    try {
      const distance = (region.delta * 1.11) / 0.00001;

      const data = await turnApi.find({
        query: {
          status: 'ACTIVE',
          $populate: {
            path: 'business'
          },
          $mongoose: {
            location: {
              $near: {
                $geometry: {
                  type: 'Point',
                  coordinates: [region.longitude, region.latitude]
                },
                $maxDistance: distance / 2 // meter.-
              }
            }
          }
        }
      });
      store.dispatch(findTurnsSuccess(data));
    } catch (e) {
      store.dispatch(findTurnsFail());
      showMessage({
        message: 'Something went wrong',
        description: e.message,
        type: 'danger',
        icon: 'danger'
      });
    }
  }

  static async findBusinessByCode(code) {
    try {
      const turns = await turnApi.find({
        query: {
          status: 'ACTIVE',
          code,
          $populate: {
            path: 'business'
          },
          $limit: 1
        }
      });
      return turns ? turns[0] : null;
    } catch (e) {
      showMessage({
        message: 'Something went wrong',
        description: e.message,
        type: 'danger',
        icon: 'danger'
      });
    }
  }
}
