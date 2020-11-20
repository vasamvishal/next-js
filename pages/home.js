import React, { Suspense, lazy } from "react";
import styles from "./HomePage.module.scss";
import Card from '@material-ui/core/Card';
import { connect } from "react-redux";
import { setIntialState, searchValue, selectedBook, setState, getPageCount } from "../redux/action/HomePageAction";
import ReactPaginate from 'react-paginate';
import SkeletonCard from "../pages/component/SkeletonCard"
import BrowserService from "../BrowserService/BrowserService";
import HelpMenu from "./component/HelpMenu/HelpMenu";
import Router from 'next/router';
import Link from "next/link";
import dynamic from "next/dynamic";
const BookDetailsComponent = dynamic(() => import('../pages/component/BookDetailsComponent'));
const SiteHeader = dynamic(() => import('../pages/component/SiteHeader/SiteHeader'));

class HomePage extends React.Component {
    didMount = false;
    countNoOfPages = false;
    searchData = false;
    constructor(props) {
        super(props);

        console.log("homePage", props);
        this.state = {
            books: [],
            pageOfItems: [],
            offset: 0,
            data: [],
            perPage: 10,
            currentPage: 0,
            countNoOfPages: [],
            searchData: [],
            paginationValue: 0,
            clicked: true,
            show: true,
            expanded: null,
            value: false,
            skeletonItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
        // console.log(this.props.props);
        // this.setExpanded();
    }

    componentDidMount() {
        this.getPageResult();
    }

    setPageData = async (payload) => {
        console.log("blag");
        const res = await fetch(`https://springbootbackendjava.herokuapp.com/getAll?pageNo=${payload}&pageSize=10`)
        const posts = await res.json()
        this.setState({ pageOfItems: posts });
        console.log("postsResult", posts)
        return {
            props: {
                posts,
            },
        }

    }

    static getDerivedStateFromProps(props, state) {
        // console.log("propsred", props);
        console.log("getDerivedFromProps");
        // console.log("propsStore", props.homePage);
        console.log("stateexpanded", state.expanded);
        console.log("vlaue", state.value);
         if (state.expanded === null) {
            let { storeData } = props.homePage;
            console.log("store", storeData);
            return {
                expanded: storeData
            }
        }
        else if (props.homePage.storeData !== state.expanded && state.expanded !== null ) {
            console.log("storeData", props.homePage.storeData);
            return {
                expanded: props.homePage.storeData,
            }
        }
        else if (state.expanded === true && Router.asPath === "/home" && typeof window !== "undefined") {
            return {
                expanded: false,
            }
        }
        else {
            return null;
        }
    }

    recievedData = (data) => {
        console.log("recieved", this.state.countNoOfPages);
        console.log(this.state.countNoOfPages / this.state.perPage);
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            paginationValue: Math.ceil(this.state.countNoOfPages / this.state.perPage),
            pageOfItems: slice
        })
    }

    recievedGetData = () => {
        this.setState({
            paginationValue: Math.ceil(this.state.countNoOfPages / this.state.perPage)
        })
    }

    getPageResult = () => {
        console.log("cdcdaxaxdds");
        return fetch(`https://springbootbackendjava.herokuapp.com/searchBook`, {
            mode: "cors",
            headers: {
                'Accept': 'application/json',
            }
        })
            .then(result =>
                result.json()
            ).then(data => {
                console.log("dtaajson", data);
                this.setState({
                    countNoOfPages: data.length,
                    searchData: data
                }, () => {
                    this.recievedData(data);
                });
                return data
            })
            .catch((err) => {
                return Promise.reject("Error Occured while Fetching Customers " + err);
            })
    }

    searchValuePagination = (data) => {
        this.setState({
            pageOfItems: data
        })
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        console.log(selectedPage);
        this.setPageData(selectedPage);
        this.didMount = false;
    };

    searchValue = (e) => {
        const payload = e.target.value;
        if (payload !== "") {
            const filteredData = this.state.searchData.filter(element => {
                return element.title.toLowerCase().includes(payload.toLowerCase());
            });
            this.setState({ pageOfItems: filteredData, clicked: false })
            this.searchValuePagination(filteredData);
        }

        else if (payload.length === 0) {
            const filteredData = this.state.pageOfItems.filter(element => {
                return element.title.toLowerCase().includes(payload.toLowerCase());
            });
            this.setState({ pageOfItems: filteredData, clicked: true })
            this.recievedData(filteredData);
        }
    }

    getCard = () => {
        return (
            <div className={styles.rootblock}>
                <div>
                    {this.state.pageOfItems.map((item, i) => (
                        <div className={styles.cardblock} key={i}>
                            <Card className={styles.card} onClick={() => {
                                this.props.selectedBook(item)
                            }}>
                                <BookDetailsComponent element={i} item={item} />
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    showSkeletonCard = () => {
        return (
            <div className={styles.rootblock}>
                <div>
                    {this.state.skeletonItems.map((item, i) => (
                        <div className={styles.cardblock} key={i}>
                            <SkeletonCard />
                        </div>
                    ))}
                </div>
            </div>
        )
    }


    render() {
        console.log("expandedrender", this.state.expanded);
        console.log(this.props.homePage.storeData, "propsrender");
        console.log("state", this.state.value);
        console.log("Router", Router);
        // this.setExpanded(this.props.homepage)
        if (this.state.expanded) {
            console.log("blah");
            const itemDetails = JSON.stringify(this.props.homePage.selectedBook);
            let id = this.props.homePage.selectedBook._id;
            BrowserService.setLocalStorageValue("selectedBook", itemDetails);
            console.log("id", id);
            Router.push(`/buyPage/${id}`)
        }

        return (
            <>
                <div className={styles.homepage}>
                    <SiteHeader onSearchValue={this.searchValue} />
                    <div className={styles.maincontent}>
                        <div>
                            {this.state.pageOfItems.length > 0 ? this.getCard() : this.showSkeletonCard()}
                        </div>
                        <div className={styles.footerheader}>
                            {this.state.clicked ?
                                <ReactPaginate
                                    previousLabel={"prev"}
                                    nextLabel={"next"}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={this.state.paginationValue}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={styles.pagination}
                                    subContainerClassName={`{styles.pages} {styles.pagination}`}
                                    activeClassName={"active"} /> : ""}
                            <br />
                            <br />
                            <br />
                        </div>
                        {/* <HelpMenu /> */}
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        "setState": () => (dispatch(setState())),
        "getPageCount": () => (dispatch(getPageCount())),
        "selectedBook": (item) => (dispatch(selectedBook(item))),
        "setInitialState": (payload) => (dispatch(setIntialState(payload))),
        "searchValue": () => (dispatch(searchValue()))
    };
};

export async function getStaticProps() {
    let payload = 0;
    return (new HomePage().setPageData(payload));
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
