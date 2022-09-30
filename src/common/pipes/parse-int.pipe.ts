import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): number {
    console.log('ParseIntPipe.value', value);
    console.log('ParseIntPipe.metadata', metadata);

    const intValue = parseInt(value, 10);
    if (isNaN(intValue)) {
      throw new BadRequestException(
        `ParseIntPipe: Validation failed "${value}" is not an integer.`,
      );
    }

    return intValue;
  }
}
