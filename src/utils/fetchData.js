import { deliveryClient } from "../Client/DeliveryClient";

export const fetchData = async (slug) => {
  let data;

  await deliveryClient
    .items()
    .type(slug)
    .toPromise()
    .then((res) => (data = res));

  return data;
};

export const fetchDataById = async (slug) => {
  let data;

  await deliveryClient
    .items()
    .equalsFilter("system.id", slug)
    .toPromise()
    .then((res) => (data = res));
  return data;
};
