import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd-mobile';
import './index.less';

const { CheckboxItem } = Checkbox;

function CustomerList(props) {
    const { item, multipleChoiceType, choiseList, changeChoise, transfer, jobType, history, hidden, hasDistribution } = props;
    // isNewCustomer 新
    // isNewConstruction 工
    const jumpSales = (event) => {
        event.stopPropagation();
        if (jobType !== 'BD') {
            history.push(`/customer-manage/sales/${item.employeeNumber}?employeeName=${item.employeeName}`);
        }
    };

    const onChange = (event) => {
        event.stopPropagation();
        const { checked } = event.target;
        changeChoise(checked, item.id);
    };

    // 跳转详情
    const goDetail = (event) => {
        event.stopPropagation();
        history.push(`/customer-manage/detail/${item.id}`);
    };

    const checked = choiseList.some((v) => {
        return v === item.id;
    });

    return (
        <div className="customer-card">
            {multipleChoiceType && (
                <div className="left">
                    <CheckboxItem keys={item.id} checked={checked} onChange={onChange} />
                </div>
            )}

            <div className="right" onClick={goDetail}>
                <div className="customer-header">
                    {item.customerName} {item.remarkName ? `(${item.remarkName})` : ''}
                </div>
                <div className="customer-content">
                    <div className="content-first">
                        <span className="first-span">{item.mobile}</span>
                        <span className="first-span">{item.statusName}</span>
                        <span className="first-span">{item.dealTypeName}</span>
                    </div>
                    <div className="customer-message">近一次跟进：{item.recentFollowDateStr || ''}</div>
                    <div className="customer-message">近一次交易：{item.recentOrderDateStr || ''}</div>
                    <div className="customer-message">转移时间：{item.transferTimeStr || ''}</div>
                </div>
                <div className="customer-footer">
                    <div className="footer-left footer-text" onClick={jumpSales}>
                        {item.employeeName}
                    </div>
                    {!multipleChoiceType && !hidden && (
                        <div
                            className="footer-right footer-text"
                            onClick={(event) => {
                                event.stopPropagation();
                                return transfer(item.id);
                            }}
                        >
                            { item.isAllot === 1 ? '分配' : '转移' }
                        </div>
                    )}
                </div>
            </div>
            <div className="marker-box">
                {/* <div className="corner-marker new">新</div>
                <div className="corner-marker gong">工</div> */}
                {item.isNewCustomer && <div className="corner-marker new">新</div> }
                {item.isNewConstruction && <div className="corner-marker gong">工</div> }
            </div>
        </div>
    );
}

CustomerList.propTypes = {
    item: PropTypes.object,
    multipleChoiceType: PropTypes.bool,
    choiseList: PropTypes.array,
    changeChoise: PropTypes.func,
    transfer: PropTypes.func,
    jobType: PropTypes.string,
    history: PropTypes.object,
    hidden: PropTypes.bool,
    hasDistribution: PropTypes.bool,
};

CustomerList.defaultProps = {
    item: {},
    multipleChoiceType: false,
    choiseList: [],
    changeChoise: () => {},
    transfer: () => {},
    jobType: '',
    history: {},
    hidden: false,
    hasDistribution: false,
};

export default withRouter(CustomerList);
