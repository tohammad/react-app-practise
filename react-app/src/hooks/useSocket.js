import { useState, useMemo, useEffect } from 'react';
import io from 'socket.io-client';
import { ENV } from '../services/Constants';
import useCurrentUser from './useCurrentUser';

const useSocket = ({ type, isToastShown }) => {
  const [isConnected, setIsConnected] = useState(false);
  const { currentUser } = useCurrentUser();
  const socket = useMemo(() => io(ENV.TYS_SOCKET_API_URL), [type]);

  useEffect(() => {
    if (type) {
      socket.on('connect', () => setIsConnected(true));
      socket.on('disconnect', () => setIsConnected(false));
    }
  }, [type]);

  // currently used as this is no longer a valid event name
  const didReceiveEvent = (callback) => {
    socket.on(`${currentUser.entityID}-${type}-${currentUser.userRole}`, (data) => {
      callback(data);
    });
  };

  const disconnect = () => socket.close();

  return [didReceiveEvent, disconnect, isConnected];
};

export default useSocket;
