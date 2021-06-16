import React, { useState } from 'react';

import {
    Container,

    ContainerHeaderAccounts,
    ContentHeaderAccounts,

    ContainerBodyAccounts,
    ContainerListaAccounts,
    ContainerItemAccount,
    LabelItemAccount,
    ContentItemAccount,
    StatusLinkedAccount,
    ItemStatus
} from './styles';
import { FaTwitch, FaWindowRestore } from 'react-icons/fa';
import colors from '../../../../../styles/colors';

function LinkedAccounts({user,linkedAccount}) {
    const [ accounts, setAccounts ] = useState(user?user.accountsLinks:[]);  

    function iconReturn(icon,color) {
        console.log(color)
        switch (icon) {
            case 'FaTwitch':
                return <FaTwitch size={20} color={color?color:colors.white} />
                break;
            case 'FaWindowRestore':
                return <FaWindowRestore size={20} color={color?color:colors.white} />
                break;
            default:
                return <FaTwitch size={20} color={color?color:colors.white} />
                break;
        }
    }

  return (
    <Container>
        <ContainerHeaderAccounts>
            <ContentHeaderAccounts>
                Contas vinculadas
            </ContentHeaderAccounts>
        </ContainerHeaderAccounts>
        <ContainerBodyAccounts>
            <ContainerListaAccounts>
                {
                    accounts.map((account, index)=>{
                        return (
                            <ContainerItemAccount key={index}>
                                <ItemStatus status={account.active}>
                                    <ContentItemAccount disabled={account.active} onClick={()=>linkedAccount(account.info_accountLink.name)}>
                                        {iconReturn(account.info_accountLink.icon,account.info_accountLink.color)}
                                        <LabelItemAccount>
                                            {account.info_accountLink.name}
                                        </LabelItemAccount>
                                    </ContentItemAccount>
                                    <StatusLinkedAccount>
                                            {account.active?"VINCULADO":"NÃO VINCULADO"}
                                    </StatusLinkedAccount>
                                </ItemStatus>
                            </ContainerItemAccount>
                        )
                    })
                }
            </ContainerListaAccounts>
        </ContainerBodyAccounts>
    </Container>
  );
}

export default LinkedAccounts;