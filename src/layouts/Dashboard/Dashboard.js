import React, { useEffect, useState } from 'react';
import { FaHome, FaStore, FaCoins } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { SelectItemMenuAdmin } from '../../store/modules/menuAdmin/actions';
import colors from '../../styles/colors';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import {
    Container,
    //MENU LATERAL
    MenuLateral,
        //HEADER MENU LATERAL
        HearderMenuLateral,
        TituloMenuLateral,
        //INFO USER
        ContainerInfoUser,
        ContentInfoUser,
        ContentImageUser,
        ImageUser,
        DescInfoUser,
        NameUser,
        InfoUser,
        IconFimItemInfoUser,
        //LISTA MENU LATERAL
        ListaMenuLateral,
            //ITEM MENU LATERAL
            ContainerItem,
            ContentItem,
            IconInicioItem,
            ContentTitleItem,
            TitleItem,
            IconFimItem,
            inputAccordion,
                //SUBITEM MENU LATERAL
                ContentSubItem,
                LabelSubItem,
    //CONTENT DASHBOARD
    ContentDashboard
} from './styles';
import { Accordion } from './components';
import { AlertMessageSimple, ModalError } from '../../components';
import { setAlert } from '../../store/modules/alerts/actions';
import { setErrorGeneral } from '../../store/modules/error/actions';

function Dashboard(props) {
    const dispatch = useDispatch();
    let history = useHistory();
    const { children } = props;
    const { user, users, loading, errors, status } = useSelector(({ UserReducer }) => UserReducer);
    const [ itensMenu, setItensMenu ] = useState([]);
    const { error_general, status_error, code_general  } = useSelector(({ ErrorReducer }) => ErrorReducer);
    const { item_selected } = useSelector(({ MenuAdminReducer }) => MenuAdminReducer);
    console.log("status_error: ",status_error);
    let isAuth = user?user.streamer:true;
    function selectItemMenu(item) {
        dispatch(SelectItemMenuAdmin(item));
        console.log("item.path: ",item.path);
        history.push(item.path);
    }

    function openConfigUser() {
        history.push(`/dashboard/${user._id}/config`);
    }

    useEffect(()=>{
        setItensMenu([
            {   
                name:"Home",
                icon:<FaHome style={{flex:2}} size={22} color={colors.white} />,
                subitens:[
                    {
                        name:"Home",
                        path:"/dashboard",
                        index:1.1,
                        active:true
                    }
                ],
                active:true
            },
            {
                name:"Produtos Loja",
                icon:<FaStore style={{flex:2}} size={22} color={colors.white} />,
                subitens:[
                    {
                        name:"Lista de produtos",
                        path:"/dashboard/loja",
                        index:2.1,
                        active:true
                    },
                    {
                        name:"Cradastrar produto",
                        path:"/dashboard/product/create",
                        index:2.2,
                        active:true
                    },
                    {
                        name:"Lista de produtos resgatados",
                        path:"/dashboard/resgateProdutos",
                        index:2.3,
                        active:true
                    },
                    {
                        name:"Lista de produtos resgatados pendentes",
                        path:"/dashboard/resgateProdutosPendentes",
                        index:2.4,
                        active:true
                    }
                ],
                active:true
            },
            {
                name:"Pontos",
                icon:<FaCoins style={{flex:2}} size={22} color={colors.white} />,
                subitens:[
                    {
                        name:"Lista resgate de pontos",
                        path:"/dashboard/resgatePontos",
                        index:4.1,
                        active:true
                    }
                ],
                active:true
            },
            {
                name:"Rewards",
                icon:<FaCoins style={{flex:2}} size={22} color={colors.white} />,
                subitens:[
                    {
                        name:"Lista de rewards",
                        path:"/dashboard/rewards",
                        index:5.1,
                        active:true
                    }
                ],
                active:user && ((user.accessTokenTwitch && user.accessTokenTwitch.length > 0) && (user.refreshTokenTwitch && user.refreshTokenTwitch.length > 0))?true:false
            }
        ]);
    },[user]);

    useEffect(()=>{
        // console.log('error_general general: ',error_general);
        // console.log('status_error general: ',status_error);
        // console.log('code_general general: ',code_general);
        if(status_error === true){
          if (code_general == 401) {
              // console.log('fechou error modal erro 401');
              localStorage.removeItem('@siteJokerz/token');
              localStorage.removeItem('@siteJokerz/nickname');
              history.push('/home');
              dispatch(setAlert({
                message:error_general,
                tipo:'error',
                time:2000
              }));
              dispatch(setErrorGeneral('',false,0));
          }else{
              dispatch(setAlert({
                message:error_general,
                tipo:'error',
                time:2000
              }));
              dispatch(setErrorGeneral('',false,0));
              // history.push('home');
          }
        }
    },[status_error]);

    return (
        !isAuth ? (
            <Redirect to={{pathname:'/home', state:{from:props.location}}}  />
        )
        :<Container>
            <Helmet>
                <title>Dashboard Admin</title>
            </Helmet>
            <AlertMessageSimple layout={'dashboard'} />

            {/* MENU LATERAL DO LAYOUT */}
            <MenuLateral>

                {/* HEADER DO MENU LATERAL */}
                <HearderMenuLateral>
                    {
                        user&&
                        (
                            <TituloMenuLateral>
                                {user.nickname}
                            </TituloMenuLateral>
                        )
                    }
                </HearderMenuLateral>

                {/* INFORMACOES DO USUARIO DO MENU LATERAL */}
                {
                    user&&
                    (
                        <ContainerInfoUser>
                            <ContentInfoUser onClick={openConfigUser}>
                                <ContentImageUser>
                                    <ImageUser src="https://as2.ftcdn.net/v2/jpg/00/65/77/27/1000_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg" />
                                </ContentImageUser>
                                <DescInfoUser>
                                    {/* <NameUser> */}
                                        {user.name}
                                    {/* </NameUser> */}
                                    <br></br>
                                    {/* <InfoUser> */}
                                        {user.pointsSyncTwitch?"pontos sincronizados":"pontos não sincronizados"}
                                    {/* </InfoUser> */}
                                </DescInfoUser>
                                <IconFimItemInfoUser />
                            </ContentInfoUser>
                        </ContainerInfoUser>
                    )
                }

                {/* LISTA DE SUBMENUS DO MENU LATERAL */}
                <ListaMenuLateral>
                    {
                        itensMenu.map((item,index)=>{
                            if (item.active) {
                              return (
                                <ContainerItem key={index}>
                                    
                                    <Accordion
                                        title={item.name}
                                        subitens={item.subitens}
                                        selectItemMenu={selectItemMenu}
                                        item_selected={item_selected}
                                    />
                
                                </ContainerItem>
                            )
                            }
                          })
                    }
                </ListaMenuLateral>

            </MenuLateral>

            {/* CORPO DA PAGINA ENVIADA AO LAYOUT */}
            <ContentDashboard>
                {children}
            </ContentDashboard>

        </Container>
    );
}

export default Dashboard;