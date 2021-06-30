import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Marker } from '../mapMarker';

type Props = {
  adoptionData: any;
};

export const MapHours: React.FC<Props> = ({ adoptionData }) => {
  const day_array = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const mapprops = {
    center: {
      lat: adoptionData.coordinates.latitude,
      lng: adoptionData.coordinates.longitude,
    },
    zoom: 12,
  };

  return (
    <>
      <p className='font-bold mt-10 text-lg'>Location And Hours:</p>
      <div className='grid grid-cols-1 2xl:grid-cols-3 gap-4'>
        <div className='lg:col-span-2'>
          <div className='w-full h-60'>
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
              defaultCenter={mapprops.center}
              defaultZoom={mapprops.zoom}
            >
              <Marker lat={mapprops.center.lat} lng={mapprops.center.lng} />
            </GoogleMapReact>
          </div>
        </div>
        <div className='lg:col-span-1'>
          <table className='font-medium text-gray-500'>
            <tbody>
              {adoptionData.hours[0].open.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className={index === new Date().getDay() ? 'font-bold text-black' : ''}
                  >
                    <td className='px-3'>{day_array[item.day]}</td>
                    <td className='px-3'>
                      {item.start.match(/.{1,2}/g).join(' : ')} -{' '}
                      {item.end.match(/.{1,2}/g).join(' : ')}
                    </td>
                    <td>{index === new Date().getDay() && <>Open now </>}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
