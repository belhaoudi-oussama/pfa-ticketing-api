module.exports = mongoose => {
    const Ticket = mongoose.model(
        "ticket",
        mongoose.Schema(
            {
                description: String,
                status: String,
                priority: String,
                dateOpened: Date,
                dateClosed: Date,
                project_id: Number
            },
            { timestamps: true }
        )
    );

    return Ticket;
};