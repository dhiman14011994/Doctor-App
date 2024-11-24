import io from 'socket.io-client';
import {SOCKET_URL} from './endpoints';
class WSService {
  initializeSocket = async () => {
    try {
      this.socket = io(SOCKET_URL, {transports: ['websocket']});

      this.socket.on('connect', data => {
        console.log('socket connect');
      });
      this.socket.on('disconnect', data => {
        console.log('socket disconnected');
      });
      this.socket.on('error', data => {
        console.log('socket error', data);
      });
    } catch (e) {
      console.log('socket not initializing', e);
    }
  };
  emit(event, data = {}) {
    this.socket.emit(event, data);
  }
  on(event, cb) {
    this.socket.on(event, cb);
  }
  removeListener(listenerName) {
    this.socket.removeListener(listenerName);
  }
}

const socketServices = new WSService();

export default socketServices;
