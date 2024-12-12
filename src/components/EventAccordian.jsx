import { memo, useContext, useState } from "react";
import { EventContext } from "../context/EventContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchInput from "../components/SearchInput";
import EditEventModal from "./EditEventModal";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Select, MenuItem } from "@mui/material";

const EventAccordion = () => {
  const { events, deleteAllEvent, deleteEvent, updateEvent } = useContext(EventContext);
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleEdit = (event) => {
    setEventToEdit(event);
    setEditModalOpen(true);
  };

  const handleSave = (updatedEvent) => {
    updateEvent(updatedEvent);
    setEditModalOpen(false);
    setEventToEdit(null);
  };

  const filteredEvents = events.filter((event) => {
    return (
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory ? event.category === selectedCategory : true)
    );
  });

  if (events.length === 0)
    return (
      <div className=" flex items-center justify-center">
        <h1 className="text-xl sm:text-3xl text-yellow-50 font-extrabold uppercase">
          No Events Found
        </h1>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center shadow md:shadow-lg gap-6 p-6">
      <h1 className="text-3xl sm:text-3xl text-teal-700 font-extrabold uppercase text-center mb-6">
        Event Details
      </h1>

      {/* Filters */}
      <Row className="w-full max-w-4xl mb-6 space-y-3 sm:space-y-0">
        {/* Search Input */}
        <Col xs={12} md={6}>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <SearchInput
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              className="w-full sm:w-auto border border-teal-300 rounded-md px-4 py-2 shadow-md focus:ring-2 focus:ring-teal-400 transition-all"
            />
          </div>
        </Col>

        {/* Category Selector */}
        <Col xs={12} md={6}>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <Select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              displayEmpty
              className="w-full sm:w-auto bg-white border border-teal-300 rounded-md px-4 py-2 shadow-md focus:ring-2 focus:ring-teal-400"
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
                boxShadow: "0 2px 8px rgba(0, 128, 128, 0.2)",
                transition: "all 0.3s ease",
              }}
            >
              <MenuItem value="">
                <span className="text-teal-600">All Categories</span>
              </MenuItem>
              <MenuItem value="Work" className="text-teal-600 font-medium">
                Work
              </MenuItem>
              <MenuItem value="Family" className="text-teal-600 font-medium">
                Family
              </MenuItem>
              <MenuItem value="Personal" className="text-teal-600 font-medium">
                Personal
              </MenuItem>
              <MenuItem value="Other" className="text-teal-600 font-medium">
                Other
              </MenuItem>
            </Select>
          </div>
        </Col>
      </Row>

      {/* Event Cards */}
      <div className="space-y-4 w-full max-w-4xl">
        {filteredEvents.map((event, index) => (
          <Card
            key={event.id}
            className={`shadow-md border-0 rounded-lg overflow-hidden transition-transform duration-300 ease-in-out ${
              activeIndex === index ? "scale-105" : ""
            }`}
          >
            <Card.Header
              onClick={() => handleToggle(index)}
              className="bg-gradient-to-r from-teal-500 to-teal-700 text-white flex justify-between items-center cursor-pointer hover:opacity-90 p-4 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <span className="font-bold text-lg">{event.date}</span>
                <span className="text-base font-medium">{event.title}</span>
              </div>
              <div className="flex gap-3">
                <EditIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(event);
                  }}
                  className="cursor-pointer hover:text-yellow-300 transition-colors duration-200"
                />
                <DeleteIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteEvent(event.id);
                  }}
                  className="cursor-pointer hover:text-red-300 transition-colors duration-200"
                />
              </div>
            </Card.Header>
            {activeIndex === index && (
              <Card.Body
                className="bg-teal-400 text-white-800 p-4 overflow-hidden transition-max-height duration-300 ease-in-out"
                style={{ maxHeight: activeIndex === index ? "500px" : "0px" }}
              >
                <p className="mb-2"><strong>Category:</strong> {event.category}</p>
                <p className="mb-2"><strong>Details:</strong> {event.details}</p>
                <p className="mb-2"><strong>Start Time:</strong> {event.startTime}</p>
                <p className="mb-2"><strong>End Time:</strong> {event.endTime}</p>
              </Card.Body>
            )}
          </Card>
        ))}
      </div>

      {/* Delete All Button */}
      <Button
        onClick={deleteAllEvent}
        className="bg-red-500 text-white font-bold px-6 py-3 rounded-lg shadow-lg transition-transform hover:scale-105 hover:bg-red-700"
      >
        Delete All
      </Button>

      {/* Edit Event Modal */}
      {editModalOpen && (
        <EditEventModal
          isOpen={editModalOpen}
          event={eventToEdit}
          onSave={handleSave}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default memo(EventAccordion);
