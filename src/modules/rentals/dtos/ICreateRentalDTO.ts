
interface ICreateRentalDTO {
    user_id: string;
    car_id: string;
    expected_return_date;
    id?: string;
    end_date?: Date;
    total?: number;
}

export { ICreateRentalDTO };