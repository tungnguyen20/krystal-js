export class Krystal {

    constructor() {

    }

    isAvailable(): boolean {
        // @ts-ignore
        return (global['checkIsKrystalAvailable'] && global['checkIsKrystalAvailable']()) || false;
      }

}