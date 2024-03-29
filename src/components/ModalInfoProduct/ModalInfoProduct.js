import React from 'react';

import {
    Container,
    
    ContentCardInfo,
    ContentImage,
    Image,
    ContentInfoCard,

    TitleCard,
    DescCard,
    ActionCard,
    Amount,
    ButtonAction,
    ContentPrice,
    Price,
    Desconto,
    PriceOld,
    ContentAction,
    ContentButtonAdd,
    ButtonAdd
 } from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { 
    setStatusModal
} from '../../store/modules/modal/actions';
import { Button } from 'react-bootstrap';
import { GiPopcorn } from 'react-icons/gi';
import { FaEye, FaInfoCircle } from 'react-icons/fa';
import { FiShoppingBag } from 'react-icons/fi';
import { MdTitle, MdSubtitles } from 'react-icons/md';

function ModalInfoProduct({
    show,
    infoProduct
}) {
    let image = `https://steamcommunity-a.akamaihd.net/economy/image/${infoProduct.image}`;

    const dispatch = useDispatch();
    const { user } = useSelector(({ UserReducer }) => UserReducer);

    const dimisissModal = (e)=>{
        console.log(e.target);
        console.log(e.currentTarget);
        if (e.target === e.currentTarget) {
            dispatch(setStatusModal(false));
        }
    }

    const OpenActionLink = ()=>{
        window.location.assign(infoProduct.inspectLink);
    }

    return (
            show && 
            (
                <Container className='fundo' onClick={dimisissModal}>
                    <ContentCardInfo>
                        <ContentImage>
                            <Image
                                src={image}
                            />
                            <ContentPrice>
                                {
                                    infoProduct.promo && (
                                        <PriceOld>
                                            {infoProduct.price}
                                        </PriceOld>
                                    )
                                }
                                <Price>
                                    {infoProduct.promo?((infoProduct.price - infoProduct.pricePromo)*100)/infoProduct.price:infoProduct.price}  <GiPopcorn/> 
                                </Price>
                                <Desconto>
                                    {infoProduct.pricePromo?'-'+infoProduct.pricePromo+'%':''}
                                </Desconto>
                            </ContentPrice>
                            {
                                (infoProduct.inspectLink.trim().length > 0) && 
                                (
                                    <ActionCard>
                                        <ButtonAction onClick={OpenActionLink}>
                                            Inspecionar
                                        </ButtonAction>
                                    </ActionCard>
                                ) 
                            }
                        </ContentImage>
                        <ContentInfoCard>
                            <TitleCard>
                                <FaInfoCircle/> {infoProduct.title}
                            </TitleCard>
                            {
                                infoProduct.desc.trim().length > 0 &&
                                (
                                    <DescCard>
                                        <MdSubtitles/> {infoProduct.desc}
                                    </DescCard>
                                )
                            }
                            
                            <ContentAction>
                            </ContentAction>
                            <Amount>
                                <FiShoppingBag/>  Estoque: {infoProduct.amount}
                            </Amount>
                        </ContentInfoCard>
                    
                        <ContentButtonAdd>
                            {
                                user?
                                (
                                    
                                    user.type_account == 'pendente'?
                                    (
                                        <ButtonAdd disabled active={false} >
                                            Atualize seu perfil
                                        </ButtonAdd>
                                    ):
                                    (
                                        user.type_account == 'secondary'?
                                        (
                                            <ButtonAdd disabled active={false} >
                                                Apenas para contas primárias
                                            </ButtonAdd>
                                        ):
                                        (
                                            (user.points&&user.points>=infoProduct.price)?
                                            (
                                                <ButtonAdd active={true}>
                                                    Resgatar item
                                                </ButtonAdd>
                                            ):
                                            (
                                                <ButtonAdd disabled active={false}>
                                                    Pontos insuficientes
                                                </ButtonAdd>
                                            )
                                        )
                                    )
                                ):
                                (
                                    <ButtonAdd disabled active={false} >
                                        Faça login antes
                                    </ButtonAdd>
                                )
                            }
                        </ContentButtonAdd>

                    </ContentCardInfo>
                </Container>
            )
    );
}

export default ModalInfoProduct;