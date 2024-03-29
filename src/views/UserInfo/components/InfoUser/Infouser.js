import React from 'react';
import { GiPopcorn, GiKing } from 'react-icons/gi';
import { MdBlock } from 'react-icons/md';

import {
    Container,
    Content,
    ContentItemInfo,
    ItemLabelInfo,
    ItemValueInfo,
    ItemLabelChannels,
    ItemValuesChannels,
    ContentItemInfoChannels,
    ContentValueInfoChannels,
    ItemLabelChannel,
    ContainerValueInfoChannels,
    ContainerSelectTypeAccount,
    TitleSelectAccount
} from './styles';
import Select from 'react-select';

function InfoUser({
    user,
    users,
    typesAccount,
    addTypeAccount,
    typeSelected,
    addPrimaryAccount
}) {
    if (users && users.length > 0) {
        users = users.map((user)=>{
            return {
                value:user.name,
                label:user.name,
                id_person:user._id
            }
        });
    }
    // console.log('user: ',user);
    return (
        <Container>
            {
                user && !(user.type_account == 'pendente')?
                (
                    <Content>

                        {/* TIPO DA CONTA */}
                        <ContentItemInfo>
                            <ItemLabelInfo>
                                    Tipo da conta: 
                            </ItemLabelInfo>
                            <ItemValueInfo>
                                    {(user && user.type_account)?user.type_account:'Não informado'}
                            </ItemValueInfo>
                        </ContentItemInfo>
            
                        {/* NICKNAME */}
                        <ContentItemInfo>
                            <ItemLabelInfo>
                                    Nickname: 
                            </ItemLabelInfo>
                            <ItemValueInfo>
                                    {(user && user.nickname)?user.nickname:'Não informado'}
                            </ItemValueInfo>
                        </ContentItemInfo>
            
                        {/* PONTOS */}
                        <ContentItemInfo>
                            <ItemLabelInfo>
                                    Pontos Totais: 
                            </ItemLabelInfo>
                            <ItemValueInfo style={{color:'orange'}}>
                                    {(user && user.points)?user.points:0} <GiPopcorn/>
                            </ItemValueInfo>
                        </ContentItemInfo>
                        
                        {/* TRADELINK */}
                        <ContentItemInfo>
                            <ItemLabelInfo>
                                    TradeLink: 
                            </ItemLabelInfo>
                            <ItemValueInfo>
                                    {(user && user.tradelinkSteam)?user.tradelinkSteam:'Não informado'}
                            </ItemValueInfo>
                        </ContentItemInfo>
            
                        {/* CANAIS */}
                        <ContentItemInfoChannels>
                            <ItemLabelChannels>
                                    Canais habilitados
                            </ItemLabelChannels>
                            <ContentValueInfoChannels>
                                {
                                    (user && user.channels)&&
                                    (
                                        user.channels.map((channel,index)=>{
                                            return(
                                                <ContainerValueInfoChannels key={index}> 
                                                    <ItemLabelChannel status={channel.status && user.active}>
                                                        {channel.info_channel.name}: 
                                                    </ItemLabelChannel>
                                                    <ItemValuesChannels status={channel.status && user.active} style={{color:'orange'}}>
                                                        {channel.points} 
                                                        <GiPopcorn/>  
                                                        {channel.banned && <MdBlock style={{color:'red'}}/>}  
                                                        {channel.subscribe && <GiKing style={{color:'yellow'}}/>}
                                                    </ItemValuesChannels>
                                                </ContainerValueInfoChannels>
                                            )
                                        })
                                    )
                                }
                            </ContentValueInfoChannels>
                        </ContentItemInfoChannels>
                        
                        {/* CONTAS SECUNDARIAS */}
                        {
                            user.type_account == 'primary'?
                            (
                                <ContentItemInfoChannels>
                                    <ItemLabelChannels>
                                            Contas secundarias
                                    </ItemLabelChannels>
                                    <ContentValueInfoChannels>
                                        {
                                            (user && user.channels)&&
                                            (
                                                user.secondary_accounts.map((account,index)=>{
                                                    return(
                                                        <ContainerValueInfoChannels key={index}> 
                                                            <ItemLabelChannel status={true}>
                                                                {account.name}: 
                                                            </ItemLabelChannel>
                                                            <ItemValuesChannels style={{color:'orange'}} status={true}>
                                                                {account.points}<GiPopcorn/>
                                                            </ItemValuesChannels>
                                                        </ContainerValueInfoChannels>
                                                    )
                                                })
                                            )
                                        }
                                    </ContentValueInfoChannels>
                                </ContentItemInfoChannels>
                            ):
                            (
                                <ContentItemInfoChannels>
                                    <ItemLabelChannels>
                                            Conta primaria vinculda
                                    </ItemLabelChannels>
                                    <ContentValueInfoChannels>
                                        <ContainerValueInfoChannels> 
                                            <ItemLabelChannel status={true}>
                                                {user.primary_account_ref.name}: 
                                            </ItemLabelChannel>
                                            <ItemValuesChannels style={{color:'orange'}} status={true}>
                                                {user.primary_account_ref.points}<GiPopcorn/> 
                                            </ItemValuesChannels>
                                        </ContainerValueInfoChannels>
                                    </ContentValueInfoChannels>
                                </ContentItemInfoChannels>
                            )
                        }
                    
                    </Content>
                ):
                (
                    typeSelected.value == 'secondary'?
                    (
                        <ContainerSelectTypeAccount>
                            <TitleSelectAccount>
                                Selecione a conta primaria que irá se vincular.
                            </TitleSelectAccount>
                            <Select
                                value={typeSelected}
                                onChange={addPrimaryAccount}
                                options={users}
                            />
                        </ContainerSelectTypeAccount>
                    ):
                    (
                        <ContainerSelectTypeAccount>
                            <TitleSelectAccount>
                                Qual o tipo da sua conta?
                            </TitleSelectAccount>
                            <Select
                                value={typeSelected}
                                onChange={addTypeAccount}
                                options={typesAccount}
                            />
                        </ContainerSelectTypeAccount>
                    )
                )
            }
        </Container>
    );
}

export default InfoUser;