import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

export const RoomTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Description
                </TableCell>
                <TableCell>
                  Acreage
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  Period
                </TableCell>
                <TableCell>
                  TypeRoom
                </TableCell>
                <TableCell>
                  Deposit
                </TableCell>
                <TableCell>
                 LstTransaction
                </TableCell>
                <TableCell>
                 Status
                </TableCell>
                <TableCell>
                  Created At
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((room) => {
                const isSelected = selected.includes(room._id);

                return (
                  <TableRow
                    hover
                    key={room._id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(room._id);
                          } else {
                            onDeselectOne?.(room._id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={room?.roomAttachment?.url[0]}>
                          {getInitials(room.name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {room?.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {room.description}
                    </TableCell>
                    <TableCell>
                      {room.acreage}
                    </TableCell>
                    <TableCell>
                      {room?.address?.fullText}
                    </TableCell>
                    <TableCell>
                      {room.period}
                    </TableCell>
                    <TableCell>
                      {room.typeRoom}
                    </TableCell>
                    <TableCell>
                      {room.deposit}
                    </TableCell>
                    <TableCell>
                      {room.lstTransaction}
                    </TableCell>
                    <TableCell>
                      {room.status}
                    </TableCell>
                    <TableCell>
                      {room.createdAt}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

RoomTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
