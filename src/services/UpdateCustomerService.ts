import prismaClient from "../prisma";

interface UpdateCustomerProps {
    id: string;
    name?: string;
    email?: string;
}

class UpdateCustomerService {
    async execute({ id, name, email }: UpdateCustomerProps) {
        if (!id) {
            throw new Error("ID é obrigatório.");
        }

        const customer = await prismaClient.customer.findUnique({
            where: { id }
        });

        if (!customer) {
            throw new Error("Cliente não encontrado.");
        }

        const updatedCustomer = await prismaClient.customer.update({
            where: { id },
            data: {
                name: name || customer.name,
                email: email || customer.email
            }
        });

        return updatedCustomer;
    }
}

export { UpdateCustomerService };