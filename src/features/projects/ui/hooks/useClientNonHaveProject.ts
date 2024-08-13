import { useEffect, useState } from 'react';
import { useQueryAllClients } from '../../../../services/client/hooks/useQueryAllClients';

export const useClientNonHaveProject = () => {
  const clients = useQueryAllClients();
  const [clientData, setClientData] = useState<any>([]);

  useEffect(() => {
    const checkClientProject = clients.data?.filter((client) => {
      if (!client.project) {
        return client;
      }
    });

    const getClient = checkClientProject?.map((cl) => cl);

    setClientData(getClient);
  }, [clients.data]);

  return { clientData };
};
