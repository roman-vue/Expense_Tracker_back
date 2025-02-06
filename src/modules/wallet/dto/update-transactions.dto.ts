import { PartialType } from "@nestjs/swagger";
import { CreateTransactionsDto } from "./create-transactions.dto";

export class UpdateTransactionsDto extends PartialType(CreateTransactionsDto) {}