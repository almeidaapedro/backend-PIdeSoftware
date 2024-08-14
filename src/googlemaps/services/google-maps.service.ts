import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GoogleMapsService {
  private readonly apiKey: string = 'AIzaSyAXTst__t08nB_p-NVmKsjSd-yIXh2Z33Y';

  constructor(private readonly httpService: HttpService) {}

  async getGeocode(address: string): Promise<any> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json`;
    const response = await firstValueFrom(
      this.httpService.get(url, {
        params: {
          address,
          key: this.apiKey,
        },
      }),
    );
    return response.data;
  }

  async getPlaceDetails(placeId: string): Promise<any> {
    const url = `https://maps.googleapis.com/maps/api/place/details/json`;
    const response = await firstValueFrom(
      this.httpService.get(url, {
        params: {
          place_id: placeId,
          key: this.apiKey,
        },
      }),
    );
    return response.data;
  }
}
