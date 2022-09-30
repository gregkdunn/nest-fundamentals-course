import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class IndentityPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('IndentityPipe.value', value);
    return value;
  }
}
