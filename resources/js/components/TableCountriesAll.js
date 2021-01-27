import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import useHistory, {Link} from 'use-history'
    const rows=[];

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
    function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }
    function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
    }
    const headCells = [
        { id: 'name', numeric: false, disablePadding: true, label: 'Country' },
        { id: 'cases', numeric: true, disablePadding: false, label: 'Total Cases' },
        { id: 'Ncases', numeric: true, disablePadding: false, label: 'New Cases' },
        { id: 'recovered', numeric: true, disablePadding: false, label: 'Total Recovered' },
        { id: 'Nrecovered', numeric: true, disablePadding: false, label: 'New Recovered' },
        { id: 'deaths', numeric: true, disablePadding: false, label: 'Total Deaths' },
        { id: 'Ndeaths', numeric: true, disablePadding: false, label: 'New Deaths' },
        { id: 'test', numeric: true, disablePadding: false, label: 'Total test' },
        { id: 'Ntest', numeric: true, disablePadding: false, label: 'New test' },
        { id: 'active', numeric: true, disablePadding: false, label: 'Cases active' },
        { id: 'critical', numeric: true, disablePadding: false, label: 'Cases critical' },
        { id: 'date', numeric: true, disablePadding: false, label: 'Updated Date' },
    ];

    function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
        <TableRow>
            <TableCell padding="checkbox">

            </TableCell>
            {headCells.map((headCell) => (
            <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === headCell.id ? order : false}
            >
                <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                >
                {headCell.label}
                {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                ) : null}
                </TableSortLabel>
            </TableCell>
            ))}
        </TableRow>
        </TableHead>
    );
    }

    EnhancedTableHead.propTypes = {
        classes: PropTypes.object.isRequired,
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
    }));


    const useStyles = makeStyles((theme) => ({
        root: {  width: '100%',  },
        paper: { width: '100%',  marginBottom: theme.spacing(2),  },
        table: { minWidth: 750,   },
        visuallyHidden: { border: 0, clip: 'rect(0 0 0 0)', height: 1, margin: -1, overflow: 'hidden', padding: 0, position: 'absolute', top: 20, width: 1,},
    }));


    export default  function EnhancedTable(props) {
        const classes = useStyles();
        const [order, setOrder] = React.useState('asc');
        const [orderBy, setOrderBy] = React.useState('name');

        const [selected, setSelected] = React.useState([]);
        const [page, setPage] = React.useState(0);
        const [dense, setDense] = React.useState(false);
        const [rowsPerPage, setRowsPerPage] = React.useState(5);

        const handleRequestSort = (event, property) => {
          const isAsc = orderBy === property && order === 'asc';
          setOrder(isAsc ? 'desc' : 'asc');
          setOrderBy(property);
        };

        const handleSelectAllClick = (event) => {
          if (event.target.checked) {
            const newSelecteds = props.data.map((n) => n.name);
            setSelected(newSelecteds);
            return;
          }
          setSelected([]);
        };


        const handleChangePage = (event, newPage) => {  setPage(newPage); };
        const handleChangeRowsPerPage = (event) => {  setRowsPerPage(parseInt(event.target.value, 10)); setPage(0);};
        const handleChangeDense = (event) => { setDense(event.target.checked); };
        const isSelected = (name) => selected.indexOf(name) !== -1;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);


        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                <TableContainer>
                    <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                    aria-label="enhanced table"
                    >
                    <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={props.data.length}
                    />

                    <TableBody>
                        {stableSort(props.data, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                            const isItemSelected = isSelected(row.name);
                            const labelId = `enhanced-table-checkbox-${index}`;
                            const url = `/dashboardCountrie/${row.name}`;
                            return (
                            <TableRow
                                hover
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.name}
                                selected={isItemSelected}
                            >
                                <TableCell padding="checkbox"> </TableCell>
                                <TableCell component="th" id={labelId} scope="row" padding="none"> <Link href={url}> {row.name}</Link>  </TableCell>
                                <TableCell align="right">{row.cases}</TableCell>
                                <TableCell align="right">{row.Ncases}</TableCell>
                                <TableCell align="right">{row.recovered}</TableCell>
                                <TableCell align="right">{row.Nrecovered}</TableCell>
                                <TableCell align="right">{row.deaths}</TableCell>
                                <TableCell align="right">{row.Ndeaths}</TableCell>
                                <TableCell align="right">{row.test}</TableCell>
                                <TableCell align="right">{row.Ntest}</TableCell>
                                <TableCell align="right">{row.active}</TableCell>
                                <TableCell align="right">{row.critical}</TableCell>
                                <TableCell align="right">{row.date}</TableCell>
                            </TableRow>
                            );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={props.data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                </Paper>
            </div>
        );
    }
