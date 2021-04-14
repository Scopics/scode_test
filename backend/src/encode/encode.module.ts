import { Module } from '@nestjs/common';
import { EncodeController } from './encode.controller';
import { CrcModule } from '../crc/crc.module';

@Module({
    controllers: [EncodeController]
})
export class EncodeModule {

    static getRays (link: string): string {
        const data = EncodeModule.hexGenerator(link);
        const crc16 = new CrcModule(16);
        const crc = crc16.calcCrc(data);
        const rays = data.join('') + crc.toString(16);
        return rays;
    }

    static hexGenerator (link: string, options = { linkSeparator: '=' }): string[] {
        const indx = link.indexOf(options.linkSeparator);
        const videoCode = link.slice(indx + 1);
        const res = [];
        for (let i = 0; i < videoCode.length; i++) {
            res[i] = videoCode.charCodeAt(i).toString(16);
        }
        return res;
    };
}