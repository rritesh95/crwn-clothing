import React from 'react';

import MenuItem from '../menu-item/menu-item.component';

import { connect } from 'react-redux';
import { selectDirectorySections } from '../../redux/directory/directory.selector';
import { createStructuredSelector } from 'reselect';

import './directory.styles.scss';

const Directory = ({sections}) => (
    <div className="directory-menu">
    {
        sections.map(({id, ...OtherSectionParams}) => (
            <MenuItem key={id} {...OtherSectionParams}/>
        ))
    }
    </div>
);

const mapStateToProps = createStructuredSelector({
    sections : selectDirectorySections
});

export default connect(
    mapStateToProps
)(Directory);