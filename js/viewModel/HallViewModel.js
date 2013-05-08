define(["jquery", "ko", "dataContext", "router"], function($, ko, dataContext, router) {

    function Seat(number, status) {
        var self = this;

        self.number = number;
        self.status = ko.observable(status);

        self.booked = ko.observable(false);
        self.unbooked = ko.computed(function () {
            return !self.booked();
        });
    }

    function HallViewModel() {
        var self = this;

        self.id = ko.observable();
        self.title = ko.observable();
        self.description = ko.observable();
        self.poster = ko.observable();
        self.img1 = ko.observable();
        self.img2 = ko.observable();
        self.img3 = ko.observable();

        self.seatStatus = ['unbooked', 'booked'];
        self.numberOfSeatsBooked = ko.observable(0);

        self.seats = ko.observableArray([
            new Seat(1, self.seatStatus[0]),
            new Seat(2, self.seatStatus[0]),
            new Seat(3, self.seatStatus[0]),
            new Seat(4, self.seatStatus[0]),
            new Seat(5, self.seatStatus[0]),
            new Seat(6, self.seatStatus[0])
        ]);

        self.seats2 = ko.observableArray([
            new Seat(1, self.seatStatus[0]),
            new Seat(2, self.seatStatus[0]),
            new Seat(3, self.seatStatus[0]),
            new Seat(4, self.seatStatus[0]),
            new Seat(5, self.seatStatus[0]),
            new Seat(6, self.seatStatus[0])
        ]);

        self.seats3 = ko.observableArray([
            new Seat(1, self.seatStatus[0]),
            new Seat(2, self.seatStatus[0]),
            new Seat(3, self.seatStatus[0]),
            new Seat(4, self.seatStatus[0]),
            new Seat(5, self.seatStatus[0]),
            new Seat(6, self.seatStatus[0]),
            new Seat(7, self.seatStatus[0]),
            new Seat(8, self.seatStatus[0])
        ]);

        self.seats4 = ko.observableArray([
            new Seat(1, self.seatStatus[0]),
            new Seat(2, self.seatStatus[0]),
            new Seat(3, self.seatStatus[0]),
            new Seat(4, self.seatStatus[0]),
            new Seat(5, self.seatStatus[0]),
            new Seat(6, self.seatStatus[0]),
            new Seat(7, self.seatStatus[0]),
            new Seat(8, self.seatStatus[0])
        ]);

        self.seats5 = ko.observableArray([
            new Seat(1, self.seatStatus[0]),
            new Seat(2, self.seatStatus[0]),
            new Seat(3, self.seatStatus[0]),
            new Seat(4, self.seatStatus[0]),
            new Seat(5, self.seatStatus[0]),
            new Seat(6, self.seatStatus[0]),
            new Seat(7, self.seatStatus[0]),
            new Seat(8, self.seatStatus[0])
        ]);

        self.initialize = function(params, callback) {
            dataContext.getById(params.id, function(movie) {
                self.id(movie.id);
                self.title(movie.title);
                self.description(movie.description);
                self.poster(movie.poster);
                self.img1(movie.img1);
                self.img2(movie.img2);
                self.img3(movie.img3);
                
                if ($.isFunction(callback)) {
                    callback();
                }
            });
        };

        self.reset = function(vm) {
            vm.numberOfSeatsBooked(0);
            $.each(vm.seats(), function(i){
                vm.seats()[i].status('unbooked');
                vm.seats()[i].booked(false);
            });
            $.each(vm.seats2(), function(i){
                vm.seats2()[i].status('unbooked');
                vm.seats2()[i].booked(false);
            });
            $.each(vm.seats3(), function(i){
                vm.seats3()[i].status('unbooked');
                vm.seats3()[i].booked(false);
            });
            $.each(vm.seats4(), function(i){
                vm.seats4()[i].status('unbooked');
                vm.seats4()[i].booked(false);
            });
            $.each(vm.seats5(), function(i){
                vm.seats5()[i].status('unbooked');
                vm.seats5()[i].booked(false);
            });
        };

        self.changeSeatStatus = function(seat) {
            if (seat.status() === self.seatStatus[0]) {
                seat.status(self.seatStatus[1]);
                seat.booked(!seat.booked());
                self.numberOfSeatsBooked(self.numberOfSeatsBooked() + 1);
            } else {
                seat.status(self.seatStatus[0]);
                seat.booked(!seat.booked());
                self.numberOfSeatsBooked(self.numberOfSeatsBooked() - 1);
            }
        };

        self.hasBookedTooMany = ko.computed(function() {
            return self.numberOfSeatsBooked() > 5;
        });

        self.bookSeat = function() {
            if (self.numberOfSeatsBooked() !== 0) {
                dataContext.addToCart(self.id(), self.numberOfSeatsBooked(), function() {
                    router.navigate("#/showcase");
                });
            } else {
                alert("No seat chosen!");
            }
        };

        return {
            id: self.id,
            title: self.title,
            description: self.description,
            poster: self.poster,
            img1: self.img1,
            img2: self.img2,
            img3: self.img3,
            numberOfSeatsBooked: self.numberOfSeatsBooked,
            hasBookedTooMany: self.hasBookedTooMany,
            seats: self.seats,
            seats2: self.seats2,
            seats3: self.seats3,
            seats4: self.seats4,
            seats5: self.seats5,
            initialize: self.initialize,
            reset: self.reset,
            changeSeatStatus: self.changeSeatStatus,
            bookSeat: self.bookSeat
        }
    }

    return HallViewModel;

});