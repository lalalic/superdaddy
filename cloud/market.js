module.exports={
    typeDefs:`
        type Merchandise implements Node{
            id: ID!
            name: String
            figure: URL
            desc: String
            photos: [URL]
            author: ID!
            price: Float
            target: URL
            createdAt:Date
		    updatedAt:Date
        }

        type Transaction implements Node{
            id: ID!
            merchandise: Merchandise!
            purchaser: User!
            price: Float
            seller: User!
            createdAt: Date!
        }

        enum PaymentMethod{
            ali
            wechat
            cash
            bank
            other
        }

        type Payment implements Node{
            id: ID!
            createdAt: Date!
            transaction: Transaction!
            method: PaymentMethod!
            amount: Float!
        }
    `,
    resolver:{
        Merchandise:{
            id: Cloud.ID,
        },

        Transaction:{
            id:Cloud.ID,
            merchandise({merchandise},_,{app}){
                return app.get1Entity("Merchandise",{_id:merchandise})
            },
            purchaser({purchaser},_,{app}){
                return app.getDataLoader("User").load(purchaser)
            },
            seller({seller},_,{app}){
                return app.getDataLoader("User").load(seller)
            },
        },

        Payment:{
            id: Cloud.ID,
            transaction({transaction},_,{app}){
                return app.get1Entity("Transaction",{_id:transaction})
            },
        }
    },
}