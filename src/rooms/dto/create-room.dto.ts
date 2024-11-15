import { IsNumber, IsString } from "class-validator";

export class CreateRoomDto {
    @IsString()
    numberRoom: string;

    @IsNumber()
    capacity: number;
}
